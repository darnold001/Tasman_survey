class SurveysController < ApplicationController
    def index
        @surveys = Survey.all
        render json: @surveys
    end
end
