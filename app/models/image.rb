class Image < ActiveRecord::Base

  has_many :tags
  has_many :character_locations
  has_many :characters, through: :character_locations


  def location_for(character_id)
    character_locations.where("character_id = ?", character_id).first
  end

end
