// collect all function for req,res,next

exports.createProduct = (req, res, next) => {
    // console.log('request: ', req.body)
    const name = req.body.name;
    const price = req.body.price;
    res.json(
        {
            message: 'Create Product Success!',
            data: {
                id: 1,
                name: name,
                price: price
            }
        }
    );
    next(); // move to next method 
}


exports.getAllProducts = (req, res, next) => {
    res.json(
        {
            message: 'Successfully Get All Products',
            data: [
                {
                    id: 1,
                    name: 'Pemadam',
                    price: 0.5
                }
            ]
        }
        );
        next();
    }


