class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.references :user, foreign_key: true, null: false, index: true
      t.string :name, null: false
      t.text :content, null: false
      t.boolean :public, null: false, default: false, comment: "公開or非公開"
      t.timestamps
    end
  end
end
