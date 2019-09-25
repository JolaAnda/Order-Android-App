package de.hdmstuttgart.order_app.checkoutPayment;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.ArrayList;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;
import de.hdmstuttgart.order_app.menuActivity.ShoppingCartRecyclerViewAdapter;

public class OrderRecyclerViewAdapter extends RecyclerView.Adapter<OrderRecyclerViewAdapter.ViewHolder> {


    private static final String TAG = "OrderViewAdapter";
    public ArrayList<Meals> shoppingCart;
    private Context mContext;


    public OrderRecyclerViewAdapter(ArrayList<Meals> shoppingCart, Context mContext) {
        this.shoppingCart = shoppingCart;
        this.mContext = mContext;
    }



    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View view = (View) LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.checkout_order_recycler_item, viewGroup, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }


    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {

        Log.d(TAG, "onBindViewHolder: position" + position + " was clicked");
        Log.d(TAG, "onBindViewHolder: called");

        holder.itemText.setText(shoppingCart.get(position).name);
       // insert Description!! holder.itemDescription.setText(shoppingCart.get(position));
        String price = "" + String.format("%.2f", shoppingCart.get(position).price) + " $";
        holder.itemPrice.setText(price);

        holder.itemDescription.setText(shoppingCart.get(position).description);
    }


    @Override
    public int getItemCount() {
        return shoppingCart.size();
    }



    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView itemText;
        TextView itemDescription;
        TextView itemPrice;
        RelativeLayout parentLayout;


        public ViewHolder(View itemView) {
            super(itemView);
            itemText = itemView.findViewById(R.id.itemText);
            itemDescription = itemView.findViewById(R.id.itemDescription);
            itemPrice = itemView.findViewById(R.id.itemPrice);
            parentLayout = itemView.findViewById(R.id.parent_layout_order_overview);
        }
    }


}
