class SitesController < ApplicationController
    def index
        @sites = Site.all
        render json: @sites
    end

    def show
        @site = Site.params[:name]
        render json: @sites.surveys
    end

    def create 
        @site = Site.create(site_params)
        render json: @site
    end

private
    def site_params
        params.require(:site).permit(:site_name, :site_number, :site_id)
    end
    def set_client
        @site.find_by(params[site_name: :name])
    end

end
