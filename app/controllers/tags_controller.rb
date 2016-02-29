class TagsController < ApplicationController

  # def index
  #   @tags = Image.find_by_id(params[:image_id]).tags

  #   respond_to do |format|
  #     format.json { render json: @tags, include: :character }
  #   end
  # end


  def create
    @tag = Game.find_by_id(params[:game_id]).tags.build(tag_params)

    if @tag.save
      respond_to do |format|
        format.json { render json: 
          @tag.to_json({include: { character: {}, game: {methods: :all_tags_found?} } }), status: :created
        }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: 400}
      end
    end
  end


  def destroy
    @tag = Tag.find_by_id(params[:id])

    if @tag.destroy
      respond_to do |format|
        format.json { render json: @tag, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: 400}
      end
    end
  end


  private


  def tag_params
    params.permit(:character_id, :pos_x, :pos_y)
  end

end
