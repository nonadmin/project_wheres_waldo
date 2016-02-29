class FixGameTagImageAssociations < ActiveRecord::Migration
  def change
    remove_column :tags, :image_id
    add_column :games, :image_id, :integer
  end
end
