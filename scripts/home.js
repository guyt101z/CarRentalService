(function (global) {
    var HomeViewModel,
        app = global.app = global.app || {};

    HomeViewModel = kendo.data.ObservableObject.extend({
        carsDataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: '/data/cars.json',
                    dataType: 'json'
                },
            },
            batch: true
        }),
        model: function (){
            this.cardDataSource.fetch(function () {
                return this.cardDataSource.data();
            })
        },
        cars: function () {
            var data;
            var self = this;

            this.model.fetch(function () {
                data = self.model.data();
            });

            var carList = [];

            for (var i = 0; i < data.length; i++) {
                carList.push({
                    id: i + 1,
                    manufactorer: data[i].manufactorer,
                    model: data[i].model
                });
            }

            return carList;
        }
    });

    app.homeService = {
        viewModel: new HomeViewModel()
    };
})(window);