require "json"
require "pathname"

root = Pathname.pwd
html_files = root.children.select { |file| file.file? && file.extname == ".html" }
result = {
  html: html_files.length,
  indexable: 0,
  noindex: 0,
  broken: [],
  no_title: [],
  no_description: [],
  no_canonical: [],
  invalid_json_ld: []
}

html_files.each do |file|
  source = file.read
  relative_file = file.relative_path_from(root).to_s
  noindex = source.match?(/<meta[^>]+name=["']robots["'][^>]+noindex/i)
  verification_file = relative_file.match?(/^google[a-z0-9]+\.html$/)

  if noindex
    result[:noindex] += 1
  else
    result[:indexable] += 1
  end

  unless noindex || verification_file
    result[:no_title] << relative_file unless source.match?(/<title>[^<]+<\/title>/i)
    result[:no_description] << relative_file unless source.match?(/<meta[^>]+name=["']description["']/i)
    result[:no_canonical] << relative_file unless source.match?(/<link[^>]+rel=["']canonical["']/i)
  end

  source.scan(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/mi).flatten.each_with_index do |json_ld, index|
    JSON.parse(json_ld)
  rescue JSON::ParserError => error
    result[:invalid_json_ld] << "#{relative_file} script #{index + 1}: #{error.message.lines.first.strip}"
  end

  source.scan(/(?:href|src)=["']([^"']+)["']/).flatten.each do |url|
    next if url.match?(/^(?:https?:|mailto:|tel:|data:|javascript:|#)/)

    local_path = url.split(/[?#]/).first
    next if local_path.nil? || local_path.empty?

    target = local_path.start_with?("/") ? root.join(local_path.delete_prefix("/")) : file.dirname.join(local_path).cleanpath
    result[:broken] << "#{relative_file} -> #{url}" unless target.exist?
  end
end

puts JSON.pretty_generate(result)
issues = result[:broken] + result[:no_title] + result[:no_description] + result[:no_canonical] + result[:invalid_json_ld]
exit(1) unless issues.empty?
