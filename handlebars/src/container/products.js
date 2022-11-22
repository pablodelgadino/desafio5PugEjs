import fs from 'fs';
import __dirname from '../utils.js';


export default class Contenedor{ 
    constructor(){
        this.path = __dirname + '/files/products.json';
    }
    getAllProducts = async() => {
        try {
            if(fs.existsSync(this.path)){
                let dataProducts = await fs.promises.readFile(this.path, 'utf-8');
                let products = JSON.parse(dataProducts);
                return products;  
            }else{
                return [];
            }
        } catch (error) {
            console.log('No se encontro el archivo', error); 
        }
    }
  
    addProducts = async(product) => {
        try {
            let products = await this.getAllProducts();
            if(products.length === 0){ 
                product.id = 1; 
                products.push(product); 
                await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'));
            }else{
                product.id = products[products.length-1].id+1; 
                products.push(product); 
                await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'));
            }
        } catch (error) {
            console.log('Error en AddProducts:', error); 
        }  
    }

    getById = async(id) => {
        try {
            let products = await this.getAllProducts();
            let productId = products.find((product)=> {
                if(id == product.id){
                    return product;
                }else{
                    return null
                }
            });
            console.log('Tu producto encontrado es:', productId); 
        } catch (error) {
            console.log('Error en getById:', error); 
        }
    }

    deleteById = async(id) => {
        try {
            let products = await this.getAllProducts(); 
            let deleteObject = products.filter((product) => {
               if(id != product.id){
                    return product
               }else{
                    return null
               }
            });
            const newArray =  await fs.promises.writeFile(this.path, JSON.stringify(deleteObject, null, '\t'));
            console.log('Producto eliminado');
            return newArray; 
        } catch (error) {   
            console.log('Error en deleteById:', error);
        }
    }

    deleteAll = async() => {
        try {
            await fs.promises.writeFile(this.path, '[]');
        } catch (error) {
            console.log('Error en deleteAll', error);    
        }
    }

    updateProduct = async(obj) => {
        let products = await this.getAllProducts();
        let id = obj.id;
        let title = obj.title;
        let price = obj.price;
        let thumbnail = obj.thumbnail;
        products.map((product)=> {
            if(product.id == id){
                product.title = title;
                product.price = price,
                product.thumbnail = thumbnail;
            }
        })
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        console.log('Producto actualizado');
        return products; 
    }

}

 