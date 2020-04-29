require 'rails_helper'

RSpec.describe "Api::V1::Auth::OmniauthCallbacks", type: :request do
  describe "Twitter認証" do
    subject(:call_api){ get('/api/v1/auth/twitter')}
    before { Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:twitter]}

    context "正しく認証された場合" do

      it "ユーザーが作成される" do
        OmniAuth.config.mock_auth[:twitter] = twitter_mock
        test_hash = twitter_mock.to_hash
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(1)
        expect(User.last.name).to eq(test_hash["info"]["name"])
        expect(User.last.image).to eq(test_hash["info"]["image"])
        expect(User.last.uid).to eq(test_hash["uid"])
        expect(User.last.provider).to eq(test_hash["provider"])
      end
    end

    context "正しく認証されなかった場合" do

      it "ユーザーは作成されない" do

        OmniAuth.config.mock_auth[:twitter] = nil
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(0)
      end
    end
  end

  describe "Github認証" do
    subject(:call_api){ get('/api/v1/auth/github')}
    before { Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:github]}

    context "正しく認証された場合" do

      it "ユーザーが作成される" do
        OmniAuth.config.mock_auth[:github] = github_mock
        test_hash = github_mock.to_hash
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(1)
        expect(User.last.name).to eq(test_hash["info"]["name"])
        expect(User.last.image).to eq(test_hash["info"]["image"])
        expect(User.last.uid).to eq(test_hash["uid"])
        expect(User.last.provider).to eq(test_hash["provider"])
      end
    end

    context "正しく認証されなかった場合" do

      it "ユーザーは作成されない" do
        OmniAuth.config.mock_auth[:github] = nil
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(0)
      end
    end
  end

  describe "Github認証" do
    subject(:call_api){ get('/api/v1/auth/google_oauth2')}
    before { Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]}

    context "正しく認証された場合" do

      it "ユーザーが作成される" do
        OmniAuth.config.mock_auth[:google_oauth2] = google_mock
        test_hash = google_mock.to_hash
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(1)
        expect(User.last.name).to eq(test_hash["info"]["name"])
        expect(User.last.image).to eq(test_hash["info"]["image"])
        expect(User.last.uid).to eq(test_hash["uid"])
        expect(User.last.provider).to eq(test_hash["provider"])
      end
    end
    
    context "正しく認証されなかった場合" do

      it "ユーザーは作成されない" do
        OmniAuth.config.mock_auth[:google_oauth2] = nil
        expect {
        call_api
        follow_redirect!
        follow_redirect!
        }.to change {User.count}.by(0)
      end
    end
  end
end
