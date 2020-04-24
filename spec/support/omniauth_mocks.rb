module OmniauthMocks
  def twitter_mock
    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      "provider" => "twitter",
      "uid" => "123456",
      "info" => {
        "name" => "Mock Twitter",
        "image" => "http://mock_image_url.com",
        "location" => "",
        "urls" => {
          "Twitter" => "https://twitter.com/MockUser1234",
          "Website" => ""
        }
      },
      "credentials" => {
        "token" => "mock_credentails_token",
        "secret" => "mock_credentails_secret"
      },
      "extra" => {
        "raw_info" => {
          "name" => "Mock User",
          "id" => "123456",
          "followers_count" => 0,
          "friends_count" => 0,
          "statuses_count" => 0
        }
      }
    })
  end

  def github_mock
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new({
      "provider" => "github",
      "uid" => "123434",
      "info" => {
        "name" => "Mock Github",
        "image" => "http://mock_image_url.com",
        "location" => "",
        "urls" => {
          "Github" => "https://github.com/MockUser1234",
          "Website" => ""
        }
      }
    })
  end

  def google_mock
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new({
      "provider" => "google_oauth2",
      "uid" => "123478",
      "info" => {
        "name" => "Mock Google",
        "image" => "http://mock_image_url.com",
        "location" => "",
        "urls" => {
          "Google" => "https://google.com/MockUser1234",
          "Website" => ""
        }
      }
    })
  end
end