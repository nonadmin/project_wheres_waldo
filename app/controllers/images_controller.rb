class ImagesController < ApplicationController

  def show
    @image = Image.find_by_id(params[:id])
    @game = Game.create(image: @image)
    @highscore = @image.highscore || @image.create_highscore
  end

end
