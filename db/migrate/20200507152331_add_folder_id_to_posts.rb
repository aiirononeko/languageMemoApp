class AddFolderIdToPosts < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :folder, foreign_key: true, null: false, index: true
  end
end
