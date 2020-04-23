require 'rails_helper'

RSpec.describe "Api::V1::Auth::OmniauthCallbacks", type: :request do
  describe "Twitter認証(失敗)" do
    subject(:call_api){ get('/api/v1/auth/twitter') }
    before { Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:twitter] }
    context "正しくログイン認証された場合" do
      it "ユーザーが作成される" do
        OmniAuth.config.mock_auth[:twitter] = twitter_mock.to_h
        call_api
        follow_redirect!
        follow_redirect!
        follow_redirect!
        #User.last.name.to eq(twitter_mock["info"]["name"])
        #User.last.image.to eq(twitter_mock["info"]["image"])
        #User.last.uid.to eq(twitter_mock["uid"])
      end
    end
    context "正しく認証されなかった場合" do
      it "ユーザーは作成されない" do
        call_api
        follow_redirect!
        follow_redirect!
        follow_redirect!
        OmniAuth.config.mock_auth[:twitter] = nil
        #User.last.name.not_to eq(twitter_mock["info"]["name"])
        #User.last.image.not_to eq(twitter_mock["info"]["image"])
        #User.last.uid.not_to eq(twitter_mock["uid"])
      end
    end
  end
end