class CharactersImageJoinTable < ActiveRecord::Migration
  def change
    create_join_table :images, :characters do |t|
      t.integer :pos_x
      t.integer :pos_y
    end
  end
end
