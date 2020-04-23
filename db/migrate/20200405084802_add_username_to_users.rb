class AddUsernameToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :username, :string, limit: 30
  end

  def down
    remove_column :users, :username
  end
end
