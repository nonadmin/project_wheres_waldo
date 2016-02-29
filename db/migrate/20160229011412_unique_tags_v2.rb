class UniqueTagsV2 < ActiveRecord::Migration
  def change
    remove_index :tags, [:id, :character_id, :image_id]
    add_index :tags, [:character_id, :image_id], unique: true
  end
end
