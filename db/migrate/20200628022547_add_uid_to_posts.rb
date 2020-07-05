class AddUidToPosts < ActiveRecord::Migration[5.2]
  def up
    add_column :posts, :uid, :string
  end

  def down
    remove_column :posts, :uid, :string
  end
end
