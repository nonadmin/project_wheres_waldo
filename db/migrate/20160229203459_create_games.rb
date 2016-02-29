class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.timestamps null: false
    end

    add_column :tags, :game_id, :integer

    remove_index :tags, [:character_id, :image_id]
    add_index :tags, [:character_id, :game_id], unique: true
  end
end
