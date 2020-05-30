require 'rails_helper'

RSpec.describe FolderRelationship, type: :model do
  describe "validate presence" do
    context "parent_idがNULLの時" do
      let(:folder_relationship) { build(:folder_relationship, parent_id: nil) }
      it "エラーメッセージが返る" do
        folder_relationship.valid?
        expect(folder_relationship.errors.messages[:parent_id]).to include("を入力してください")
      end
    end

    context "child_idがNULLの時" do
      let(:folder_relationship) { build(:folder_relationship, child_id: nil) }
      it "エラーメッセージが返る" do
        folder_relationship.valid?
        expect(folder_relationship.errors.messages[:child_id]).to include("を入力してください")
      end
    end
  end

  describe "validate relation" do
    context "parent_idとchild_idが同じ時" do
      let(:folder_relationship) { build(:folder_relationship) }
      it "エラーメッセージが返る" do
        folder_relationship.update(parent_id: folder_relationship.child_id)
        folder_relationship.valid?
        expect(folder_relationship.errors.messages[:parent_id]).to include("とchild_idが同じです")
      end
    end
  end
end
