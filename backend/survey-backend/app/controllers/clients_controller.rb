class ClientsController < ApplicationController

    def index
        @clients = Clients.all
    end

    def show
        @client = Client.params[:id]
    end
