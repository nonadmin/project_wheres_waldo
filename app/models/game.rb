class Game < ActiveRecord::Base

  has_many :tags
  belongs_to :image

  def all_tags_found?
    self.tags.count == self.image.characters.count
  end

end
