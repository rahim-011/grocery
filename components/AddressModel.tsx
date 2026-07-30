
import { getAddressById } from "@/lib/addresses"
import AddressForm from "./AddressForm"
import Confirm from "./Confirm"
import Overlay from "./Overlay"


export default async function AddressModel({operation,addressId}:{operation:'add-address' | 'edit-address' |'delete-address',addressId:string|undefined}){

    const editedAddress = await getAddressById(addressId);
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 z-46 w-screen overflow-y-auto flex items-center justify-center p-4 sm:p-0">
                {operation !== 'delete-address' ?(<AddressForm operation={operation} editedAddress={editedAddress}/>) :  
                    <Confirm type="address" addressId={addressId}/>}
            </div>
            <Overlay showConfirm={true}/>
        </div>
    )
}