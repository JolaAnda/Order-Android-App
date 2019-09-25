package de.hdmstuttgart.order_app.menuActivity;

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

import java.util.ArrayList;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;

public class ShoppingCartRecyclerViewAdapter extends RecyclerView.Adapter<ShoppingCartRecyclerViewAdapter.ViewHolder> {


    private static final String TAG = "ShoppingChartAdapter";
    public ArrayList<Meals> shoppingCart;
    private Context mContext;
    private MealDeleted mealDeleted;

    public ShoppingCartRecyclerViewAdapter(ArrayList<Meals> shoppingCart, Context mContext, MealDeleted mealDeleted) {
        this.shoppingCart = shoppingCart;
        this.mContext = mContext;
        this.mealDeleted = mealDeleted;
    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View view = (View) LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.shopping_cart_item_layout, viewGroup, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {

        Log.d(TAG, "onBindViewHolder: position" + position + " was clicked");
        Log.d(TAG, "onBindViewHolder: called");

        holder.mainText.setText(shoppingCart.get(position).name);
        String price = "" + String.format("%.2f", shoppingCart.get(position).price) + " $";
        holder.price.setText(price);
        holder.deleteFromChartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                mealDeleted.onMealDeleted(shoppingCart.get(position), position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return shoppingCart.size();
    }


    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView mainText;
        TextView price;
        ImageButton deleteFromChartButton;
        RelativeLayout parentLayout;


        public ViewHolder(View itemView) {
            super(itemView);
            deleteFromChartButton = itemView.findViewById(R.id.deleteFromChartButton);
            mainText = itemView.findViewById(R.id.shoppingChartText);
            price = itemView.findViewById(R.id.shoppingChartPrice);
            parentLayout = itemView.findViewById(R.id.parent_layout_shopping_chart);
        }
    }


    // Interface that is used from activity who holds an instance of the adapter
    public interface MealDeleted {
        void onMealDeleted(Meals meal, int position);
    }
}
