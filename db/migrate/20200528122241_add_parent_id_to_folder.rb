class AddParentIdToFolder < ActiveRecord::Migration[5.2]
  def up
    add_column :folders, :parent_id, :bigint
  end

  def down
    remove_column :folders, :parent_id, :bigint
  end
end
