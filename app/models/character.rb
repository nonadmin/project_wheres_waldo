class Character < ActiveRecord::Base

  has_many :tags
  has_many :character_locations
  has_many :images, through: :character_locations

end
