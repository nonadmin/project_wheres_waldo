class FixTagPos < ActiveRecord::Migration
  def change
    remove_column :tags, :posX
    remove_column :tags, :poxY
    add_column :tags, :pos_x, :integer
    add_column :tags, :pos_y, :integer
  end
end
