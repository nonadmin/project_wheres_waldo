class HighscoresController < ApplicationController

  def update
    @highscore = Highscore.find_by_id(params[:id])

    if @highscore.update(highscore_params)
      respond_to do |format|
        format.json { render json: @highscore, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: 400}
      end
    end    
  end


  private


  def highscore_params
    params.permit(:game_id, :player, :score)
  end

end
