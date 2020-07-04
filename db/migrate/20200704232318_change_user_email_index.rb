class ChangeUserEmailIndex < ActiveRecord::Migration[5.2]
  def up
    remove_index :users, :email
    add_index :users, [:email, :provider], unique: true
  end

  def down
    remove_index :users, [:email, :provider]
    add_index    :users, :email, unique: true
  end
end
