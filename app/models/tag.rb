class Tag < ActiveRecord::Base
  include ActiveModel::Validations

  belongs_to :game
  belongs_to :character

  validates_with CorrectLocation
end
