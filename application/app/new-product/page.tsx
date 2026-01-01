'use client'
import { useRef } from "react"
import { createClient } from '@supabase/supabase-js'

export default function newProduct() {

    const nameRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!)
    let currentUserEmail: string = ""
    async function submitProduct() {
        const { error } = await supabase
            .from('products')
            .insert({ name: nameRef.current?.value, desc: descRef.current?.value, price: priceRef.current?.value })
        if(error){
            console.log(error)
        }
        else{
            console.log("SUCCESS")
        }
        getUser()
    }

    async function getUser(){
        const { data: { user } } = await supabase.auth.getUser()
        currentUserEmail = user?.data?.email;
        console.log(currentUserEmail)
        
    }

    return (
        <>
            <input type="text" placeholder="name" id="pName" ref={nameRef} />
            <input type="text" placeholder="description" id="pDesc" ref={descRef} />
            <input type="number" placeholder="price" id="pPrice" ref={priceRef} />
            <button onClick={submitProduct} className="w-[100px] h-[50px]">submit</button>
        </>
    )
}