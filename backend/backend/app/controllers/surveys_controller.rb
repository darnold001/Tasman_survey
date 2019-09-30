class SurveysController < ApplicationController

    def index
        @surveys = Survey.all
        render json: @surveys
    end

    def create
        @survey = Survey.create(survey_params)
        render json: @survey
    end

    def show
        @survey = Survey.find(params[:id])
    end
    
    def update
        @survey.update(survey_params)
        head :no_content
    end

    def destroy
        @survey = Survey.find(params[:id])
        @survey.destroy
        head:no_content
    end

private

    def survey_params
        params.require(:date, :client, :site, :surveyor, :mw)
    end

    # def set_site
    #     @site = Site.find(params[:id])
    # end

end
