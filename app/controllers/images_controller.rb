class ImagesController < ApplicationController

  def show
    @image = Image.find_by_id(params[:id])
  end

end
