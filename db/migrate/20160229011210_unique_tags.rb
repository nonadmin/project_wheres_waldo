class UniqueTags < ActiveRecord::Migration
  def change
    add_index :tags, [:id, :character_id, :image_id], unique: true
  end
end
