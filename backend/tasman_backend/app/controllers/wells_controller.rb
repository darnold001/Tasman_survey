class WellsController < ApplicationController
    def index
        @wells = Well.all
        render json: @wells
    end

    def create
        @well = Well.create(well_params)
        render json: @well
    end

    def show
        @well = Well.find_by(survey_id: params[:id])
    end
    
    def update
        @well.update(well_params)
        head :no_content
    end

    def destroy
        @well = Well.find(params[:id])
        @well.destroy
        head :no_content
    end

private

    def well_params
        params.require(:well).permit(
                       :wellID,
                       :date,
                       :rodHeight,
                       :corrected,
                       :camlock,
                       :depthtowater,
                       :gwe,
                       :gse,
                       :notes,
                       :cpRod,
                       :amslElev,
                       :lat,
                       :long,
                       :survey_id
                    )
    end
end