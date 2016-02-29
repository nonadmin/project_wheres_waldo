class AddDefaultHighscore < ActiveRecord::Migration
  def change
    change_column_default(:highscores, :score, 0)
    change_column_default(:highscores, :player, "Waldough")
  end
end
