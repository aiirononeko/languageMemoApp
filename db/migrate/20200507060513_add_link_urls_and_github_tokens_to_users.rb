class AddLinkUrlsAndGithubTokensToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :twitter_link, :string
    add_column :users, :github_link, :string
    add_column :users, :github_token, :string
  end

  def down
    remove_column :users, :twitter_link
    remove_column :users, :github_link
    remove_column :users, :github_token
  end
end
