require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  describe "GET /api/v1/posts/:id" do
    subject(:call_api){ get "/api/v1/posts/#{post.id}" }

    let(:user) { create(:confirmed_user) }

    context "folderが存在している場合" do
      let(:folder) { create :folder, user_id: user.id }
      let(:post) { create :post, user_id: user.id, folder_id: folder.id }

      it "レスポンスボディーに期待された値が返ること" do
        call_api
        res = JSON.parse(response.body)
        expect(res["data"]["attributes"]["name"]).to eq "test"
        expect(res["data"]["attributes"]["content"]).to eq "example"
        expect(res["data"]["attributes"]["public"]).to eq false
        expect(res["data"]["attributes"]["user-id"]).to eq user.id
        expect(res["data"]["attributes"]["folder-id"]).to eq folder.id
      end
    end

    context "folderが存在していない場合" do
      let(:post) { create :post, user_id: user.id, folder_id: nil }

      it "レスポンスボディーに期待された値が返ること" do
        call_api
        res = JSON.parse(response.body)
        expect(res["data"]["attributes"]["name"]).to eq "test"
        expect(res["data"]["attributes"]["content"]).to eq "example"
        expect(res["data"]["attributes"]["public"]).to eq false
        expect(res["data"]["attributes"]["user-id"]).to eq user.id
        expect(res["data"]["attributes"]["folder-id"]).to eq nil
      end
    end

    context "postが存在しない場合" do
      it 'レスポンスステータスが404で返る' do
        get "/api/v1/posts/10000"
        expect(response.status).to eq 404
      end
    end
  end

  describe "POST /api/v1/posts" do
    subject(:call_api){ post "/api/v1/posts", headers: headers, params: params }

    let(:user) { create(:confirmed_user) }
    let(:headers) { user.create_new_auth_token }
    let(:params) {{ }}

    context '投稿の作成に成功した場合' do
      context "folderが存在している場合" do
        let(:folder) { create :folder, user_id: user.id }
        let(:params) do
          {
            post: {
              name: "test",
              content: "example",
              public: false,
              user_id: user.id,
              folder_id: folder.id
            }
          }
        end

        it 'レスポンスステータスが200で返ること' do
          call_api
          expect(response.status).to eq 200
        end

        it '投稿が作成されていること' do
          expect { call_api }.to change { Post.count }.from(0).to(1)
        end

        it "レスポンスボディーに期待された値が返ること" do
          call_api
          res = JSON.parse(response.body)
          expect(res["data"]["attributes"]["name"]).to eq "test"
          expect(res["data"]["attributes"]["content"]).to eq "example"
          expect(res["data"]["attributes"]["public"]).to eq false
          expect(res["data"]["attributes"]["user-id"]).to eq user.id
          expect(res["data"]["attributes"]["folder-id"]).to eq folder.id
        end
      end

      context "folderが存在していない場合" do
        let(:params) do
          {
            post: {
              name: "test",
              content: "example",
              public: false,
              user_id: user.id,
              folder_id: nil
            }
          }
        end

        it 'レスポンスステータスが200で返ること' do
          call_api
          expect(response.status).to eq 200
        end

        it '投稿が作成されていること' do
          expect { call_api }.to change { Post.count }.from(0).to(1)
        end

        it "レスポンスボディーに期待された値が返ること" do
          call_api
          res = JSON.parse(response.body)
          expect(res["data"]["attributes"]["name"]).to eq "test"
          expect(res["data"]["attributes"]["content"]).to eq "example"
          expect(res["data"]["attributes"]["public"]).to eq false
          expect(res["data"]["attributes"]["user-id"]).to eq user.id
          expect(res["data"]["attributes"]["folder-id"]).to eq nil
        end
      end
    end

    context '投稿の作成に失敗した場合' do
      let(:params) do
        {
          post: {
            name: "",
            content: "",
            public: false,
          }
        }
      end

      it 'レスポンスステータスが422で返ること' do
        call_api
        expect(response.status).to eq 422
      end

      it 'バリデーションエラーが返ること' do
        call_api
        res = JSON.parse(response.body)
        expect(res["name"]).to eq ["を入力してください"]
        expect(res["content"]).to eq ["を入力してください"]
      end
    end
  end

  describe "PUT /api/v1/posts/:id" do
    subject(:call_api) { put "/api/v1/posts/#{post.id}", headers: headers, params: params }

    let(:user) { create :confirmed_user }
    let(:user2) { create :confirmed_user, username: "test_name" }
    let(:headers) { user.create_new_auth_token }
    let(:post) { create :post, user_id: user.id }
    let(:params) {{ }}

    context 'ログインユーザーと投稿ユーザーが一致している場合' do
      context '投稿の更新に成功した場合' do
        context "folderが存在している場合" do
          let(:folder) { create :folder, user_id: user.id }
          let(:params) do
            {
              post: {
                name: "example",
                content: "example",
                public: false,
                user_id: user.id,
                folder_id: folder.id
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
            expect(res["data"]["attributes"]["name"]).to eq "example"
            expect(res["data"]["attributes"]["content"]).to eq "example"
            expect(res["data"]["attributes"]["public"]).to eq false
            expect(res["data"]["attributes"]["user-id"]).to eq user.id
            expect(res["data"]["attributes"]["folder-id"]).to eq folder.id
          end
        end

        context "folderが存在していない場合" do
          let(:params) do
            {
              post: {
                name: "example",
                content: "example",
                public: false,
                user_id: user.id,
                folder_id: nil
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
            expect(res["data"]["attributes"]["name"]).to eq "example"
            expect(res["data"]["attributes"]["content"]).to eq "example"
            expect(res["data"]["attributes"]["public"]).to eq false
            expect(res["data"]["attributes"]["user-id"]).to eq user.id
            expect(res["data"]["attributes"]["folder-id"]).to eq nil
          end
        end
      end

      context '投稿の更新に失敗した場合' do
        let(:folder) { create :folder, user_id: user.id }
        let(:params) do
          {
            post: {
              name: "",
              content: "",
              public: false,
            }
          }
        end

        it 'レスポンスステータスが422で返ること' do
          call_api
          expect(response.status).to eq 422
        end

        it 'バリデーションエラーが返ること' do
          call_api
          res = JSON.parse(response.body)
          expect(res["name"]).to eq ["を入力してください"]
          expect(res["content"]).to eq ["を入力してください"]
        end
      end
    end

    context 'ログインユーザーと投稿ユーザーが一致していない場合' do
      before { post.update(user_id: user2.id) }

      it "アクセス権限がないと言われる" do
        call_api
        res = JSON.parse(response.body)
        expect(res["success"]).to eq false
        expect(res["errors"]).to eq ["アクセスする権限がありません"]
      end
    end
  end

  describe "DELETE /api/v1/posts/:id" do
    subject(:call_api) { delete "/api/v1/posts/#{post.id}", headers: headers }

    let(:user) { create :confirmed_user }
    let(:user2) { create :confirmed_user, username: "test_name" }
    let(:headers) { user.create_new_auth_token }
    let(:folder) { create :folder, user_id: user.id }
    let(:post) { create :post, user_id: user.id, folder_id: folder.id }

    context 'ログインユーザーと投稿ユーザーが一致している場合' do
      context '投稿の削除に成功した場合' do

        it 'レスポンスステータスが200で返ること' do
          call_api
          expect(response.status).to eq 200
        end

        it '投稿が削除されていること' do
          expect { call_api }.to change { Post.count }.by(0)
        end

        it "レスポンスボディーに期待された値が返ること" do
          call_api
          res = JSON.parse(response.body)
          expect(res['message']).to eq "削除に成功しました"
        end
      end
    end

    context 'ログインユーザーと投稿ユーザーが一致していない場合' do
      before { post.update(user_id: user2.id) }

       it "アクセス権限がないと言われる" do
         call_api
         res = JSON.parse(response.body)
         expect(res["success"]).to eq false
         expect(res["errors"]).to eq ["アクセスする権限がありません"]
       end
    end
  end
end
