require 'rails_helper'

RSpec.describe "Api::V1::Folders", type: :request do
  describe "GET /api/v1/folders/:id" do
    subject(:call_api){ get "/api/v1/users/#{user.id}/folders/#{folder.id}" }

    let(:user) { create(:confirmed_user) }
    let(:folder) { create :folder, user_id: user.id }

    it "レスポンスボディーに期待された値が返ること" do
      call_api
      res = JSON.parse(response.body)
      expect(res["data"]["attributes"]["name"]).to eq "folder_test"
      expect(res["data"]["attributes"]["public"]).to eq false
      expect(res["data"]["attributes"]["user-id"]).to eq user.id
    end
  end

  describe "POST /api/v1/posts" do
    subject(:call_api){ post "/api/v1/users/#{user.id}/folders", headers: headers, params: params }

    let(:user) { create(:confirmed_user) }
    let(:headers) { user.create_new_auth_token }
    let(:params) {{ }}

    context '投稿の作成に成功した場合' do
      let(:params) do
        {
          folder: {
            name: "folder_test",
            public: false,
          }
        }
      end

      it 'レスポンスステータスが200で返ること' do
        call_api
        expect(response.status).to eq 200
      end

      it '投稿が作成されていること' do
        expect { call_api }.to change { Folder.count }.from(0).to(1)
      end

      it "レスポンスボディーに期待された値が返ること" do
        call_api
        res = JSON.parse(response.body)
        expect(res["data"]["attributes"]["name"]).to eq "folder_test"
        expect(res["data"]["attributes"]["public"]).to eq false
        expect(res["data"]["attributes"]["user-id"]).to eq user.id
      end
    end

    context '投稿の作成に失敗した場合' do
      let(:params) do
        {
          folder: {
            name: "",
            public: false,
          }
        }
      end

      it 'バリデーションエラーが返ること' do
        call_api
        res = JSON.parse(response.body)
        expect(res["status"]).to eq "error"
        expect(res["errors"]["name"]).to eq ["を入力してください"]
      end
    end
  end

  describe "PUT /api/v1/posts/:id" do
    subject(:call_api) { put "/api/v1/users/#{user.id}/folders/#{folder.id}", headers: headers, params: params }

    let(:user) { create :confirmed_user }
    let(:user2) { create :confirmed_user, username: "test_name" }
    let(:headers) { user.create_new_auth_token }
    let(:folder) { create :folder, user_id: user.id }
    let(:params) {{ }}

    context 'ログインユーザーと投稿ユーザーが一致している場合' do
      context '投稿の更新に成功した場合' do
        let(:params) do
          {
            folder: {
              name: "update_folder_test",
              public: false,
            }
          }
        end

        it 'レスポンスステータスが200で返ること' do
          call_api
          expect(response.status).to eq 200
        end

        it "レスポンスボディーに期待された値が返ること" do
          call_api
          res = JSON.parse(response.body)
          expect(res["data"]["attributes"]["name"]).to eq "update_folder_test"
          expect(res["data"]["attributes"]["public"]).to eq false
          expect(res["data"]["attributes"]["user-id"]).to eq user.id
        end
      end

      context '投稿の更新に失敗した場合' do
        let(:params) do
          {
            folder: {
              name: "",
              public: false
            }
          }
        end

        it 'バリデーションエラーが返ること' do
          call_api
          res = JSON.parse(response.body)
          expect(res["status"]).to eq "error"
          expect(res["errors"]["name"]).to eq ["を入力してください"]
        end
      end
    end

    context 'ログインユーザーと投稿ユーザーが一致していない場合' do
        before { folder.update(user_id: user2.id) }

        it "アクセス権限がないと言われる" do
          call_api
          res = JSON.parse(response.body)
          expect(res["success"]).to eq false
          expect(res["errors"]).to eq ["You don't have the right to access this resource"]
        end
    end
  end

  describe "DELETE /api/v1/posts/:id" do
    subject(:call_api) { delete "/api/v1/users/#{user.id}/folders/#{folder.id}", headers: headers }

    let(:user) { create :confirmed_user }
    let(:user2) { create :confirmed_user, username: "test_name" }
    let(:headers) { user.create_new_auth_token }
    let(:folder) { create :folder, user_id: user.id }

    context 'ログインユーザーと投稿ユーザーが一致している場合' do
      context '投稿の削除に成功した場合' do
        it 'レスポンスステータスが200で返ること' do
          call_api
          expect(response.status).to eq 200
        end

        it '投稿が削除されていること' do
          expect { call_api }.to change { Folder.count }.by(0)
        end

        it "レスポンスボディーに期待された値が返ること" do
          call_api
          res = JSON.parse(response.body)
          expect(res["data"]["attributes"]["name"]).to eq "folder_test"
          expect(res["data"]["attributes"]["public"]).to eq false
          expect(res["data"]["attributes"]["user-id"]).to eq user.id
        end
      end
    end

    context 'ログインユーザーと投稿ユーザーが一致していない場合' do
      before { folder.update(user_id: user2.id) }

       it "アクセス権限がないと言われる" do
         call_api
         res = JSON.parse(response.body)
         expect(res["success"]).to eq false
         expect(res["errors"]).to eq ["You don't have the right to access this resource"]
       end
    end
  end
end
