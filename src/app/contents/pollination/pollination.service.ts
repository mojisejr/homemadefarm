import { Injectable } from '@angular/core'
import { pollination } from './pollination.model'
import { Crop } from './crop.model'
import { Melon } from './melon.model'
import { Product } from './product.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Subject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Helper } from '../../shared/helper.service'


@Injectable({
    providedIn: 'root',
})
export class PollinationService {
    productChanged = new Subject<Product[]>();

    private pollinationPath ="/pollination";
    private cropsPath = "/crops";
    private melonPath = "/melon";
    private productPath = "/products";

    pollinationRef: AngularFirestoreCollection<pollination> = null;
    cropsRef: AngularFirestoreCollection<Crop> = null;
    melonRef: AngularFirestoreCollection<Melon> = null;
    productRef: AngularFirestoreCollection<Product> =  null;


    constructor(private db: AngularFirestore,
        private helper: Helper) {
        this.pollinationRef = db.collection(this.pollinationPath);
        this.cropsRef = db.collection(this.cropsPath);
        this.melonRef = db.collection(this.melonPath);
        this.productRef = db.collection(this.productPath);
    }

    addPollination(pollination) {
        return this.pollinationRef.add({ ...pollination });
    }

    addCrop(crop: Crop) {
        this.cropsRef.add({ 
            ...crop,
            status: 'Initial'
         });
    }

    addProduct(product: Product) {
        return this.productRef.add({ ...product });
    }

    deleteTag(id: string) {
        this.db.doc('/pollination/' + id)
        .delete()
        .then(data => {
            console.log("delete done");
        })
        .catch(err => {
            console.log(err);
        })
    }

    getPollinationList(): AngularFirestoreCollection<pollination> {
        return this.pollinationRef;
    }
    getTagColorById(docId) {
        return this.db.collection<pollination>('/pollination', ref => ref.where('docId', "==", docId)).valueChanges();
    }
    getTagColorByIdSnapshot(docId) {
        return this.db.collection<pollination>('/pollination', ref => ref.where('docId', "==", docId));
    }
    getCropsList(): Observable<Crop[]> {
        return this.cropsRef.snapshotChanges()
        .pipe(
            map(snaps => {
                return snaps.map(snap => {
                    return {
                        id: snap.payload.doc.id,
                        ...snap.payload.doc.data() as Crop
                    }
                })
            })
        )
    }
    getActiveCropList(): Observable<Crop[]> {
        return this.getCropsList().pipe(
            map(snaps => {
                return snaps.filter(snap => {
                    return snap.status !== "Closed";
                })
            })
        )
    }

    getHistoryCropList(): Observable<Crop[]> {
        return this.getCropsList().pipe(
            map(snaps => {
                return snaps.filter(snap => {
                    return snap.status === "Closed";
                })
            })
        )
    }
    getCropById(docId: string) {
        return this.cropsRef.doc<Crop>(docId).valueChanges();
    }
    getMelonList(): AngularFirestoreCollection<Melon> {
        return this.melonRef;
    }
    getMelonById(melon) {
        return this.melonRef.doc<Melon>(melon).valueChanges();
    }
    getProductByCropId(cropId) {
        return this.db.collection<Product>('/products', ref => ref.where('cropId', "==", cropId))
        .snapshotChanges();
    }

    fetchProductByCropId(cropId){ 
        this.db.collection<Product>('/products', ref => ref.where('cropId', "==", cropId).orderBy("row").orderBy("species"))
        .snapshotChanges()
        .pipe(
            map(product => product.map(p => {
                return {
                    id: p.payload.doc.id,
                    ...p.payload.doc.data(),
                }
            }))
        )
        .subscribe((product: Product[]) => {
            this.productChanged.next(product);
        });
    }
    
    getEstHarvestDate(type: string, docId: string, color: string) {
        return combineLatest(
            this.getMelonById(type),
            this.getTagColorByIdSnapshot(docId).snapshotChanges()
        ).pipe(map(([melon, type]) => {
            const tagColor = type.find(c => c.payload.doc.data()['tagColor'] === color);
            return this.helper.estHarvestCalc(tagColor.payload.doc.data()['createdAt'], melon.harvestdays);
        }))
        
    }


    updateDetail(docId, value, key) {
        switch (key) {
            case "UPDATE_CROP_DETAIL":
                return this.cropsRef.doc<Crop>(docId).update(value);
            case "UPDATE_PRODUCT_SORTING":
                return this.productRef.doc<Product>(docId).update(value);
            default:
                break;
        }
    }

    updateCropStatus(docId: string, status) {
        return this.cropsRef.doc<Crop>(docId).update({status: status});
    }
}