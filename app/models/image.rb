class Image < ActiveRecord::Base

  has_one :highscore
  has_many :games
  has_many :character_locations
  has_many :characters, through: :character_locations, counter_cache: true

  def location_for(character_id)
    character_locations.where("character_id = ?", character_id).first
  end

end
