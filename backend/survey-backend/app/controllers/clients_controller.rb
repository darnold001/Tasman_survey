class ClientsController < ApplicationController

    def index
        @clients = Client.all
        render json: @clients
    end

    def show
        @client = Client.find_by(client_id: params[:id])
        render json: @client
    end

    def create 
        @client = Client.create(client_params)
        render json: @client
    end

    def update
        @client.update(client_params)
        head:no_content
    end

    def destroy 
        @client = Location.find_by(client_id: params[:id])
        @client.destroy
        head:no_content
    end


 private 
    
    def client_params
     params.require(:client).permit(:name, :region)
    end

    def set_client
        @client.find_by(params[client_id: :id])
    end
end