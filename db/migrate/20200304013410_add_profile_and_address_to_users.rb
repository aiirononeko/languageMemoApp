class AddProfileAndAddressToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :address, :text
    add_column :users, :profile, :string
  end

  def down
    remove_column :users, :address, :text
    remove_column :users, :profile, :string
  end
end
