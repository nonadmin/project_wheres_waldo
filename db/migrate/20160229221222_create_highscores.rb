class CreateHighscores < ActiveRecord::Migration
  def change
    create_table :highscores do |t|
      t.string :player
      t.integer :score
      t.integer :image_id

      t.timestamps null: false
    end
  end
end
