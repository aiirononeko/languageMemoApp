class CreateFolderRelationships < ActiveRecord::Migration[5.2]
  def up 
    create_table :folder_relationships do |t|
      t.references  :parent, foreign_key: { to_table: :folders }, name: 'index_folder_relationships_on_parent'
      t.references  :child, foreign_key: { to_table: :folders }, name:'index_folder_relationships_on_child'
      t.timestamps
    end
    add_index :folder_relationships, [:parent_id, :child_id], unique: true, name: 'index_folder_relationships_on_parent_id_and_child_id'
  end

  def down
    drop_table :folder_relationships
  end
end
