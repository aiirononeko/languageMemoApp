class AddProfileAndAddressToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :address, :string, limit: 30
    add_column :users, :profile, :string
  end

  def down
    remove_column :users, :address, :string
    remove_column :users, :profile, :string
  end
end
