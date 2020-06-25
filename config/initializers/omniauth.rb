Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github,        ENV['GITHUB_KEY'],   ENV['GITHUB_SECRET'], scope: 'user, repo', provider_ignores_state: true
  provider :twitter,       ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
  provider :google_oauth2, ENV['GOOGLE_KEY'],   ENV['GOOGLE_SECRET'], skip_jwt: true
end
