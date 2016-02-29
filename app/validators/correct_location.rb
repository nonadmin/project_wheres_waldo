class CorrectLocation < ActiveModel::Validator
  def validate(record)
    true_x = record.game.image.location_for(record.character).pos_x
    true_y = record.game.image.location_for(record.character).pos_y

    unless record.pos_x.between?(true_x - 50, true_x + 50) &&
           record.pos_y.between?(true_y - 50, true_y + 50)
      record.errors[:base] << 'Location incorrect!'
    end
  end
end