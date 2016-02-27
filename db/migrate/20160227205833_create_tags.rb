class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :character_id
      t.integer :image_id
      t.integer :posX
      t.integer :poxY

      t.timestamps null: false
    end
  end
end
