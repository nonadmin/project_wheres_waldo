class CreateCharacterLocations < ActiveRecord::Migration
  def change
    drop_table :characters_images 
    
    create_table :character_locations do |t|
      t.integer :image_id
      t.integer :character_id
      t.integer :pos_x
      t.integer :pos_y

      t.timestamps null: false
    end
  end
end
