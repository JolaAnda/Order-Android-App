package de.hdmstuttgart.order_app.menuActivity;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.ArrayList;

import de.hdmstuttgart.order_app.Meals;
import de.hdmstuttgart.order_app.R;

public class MenuRecyclerViewAdapter extends RecyclerView.Adapter<MenuRecyclerViewAdapter.ViewHolder> {

    private static final String TAG = "MenuRecyclerViewAdapter";
    private ArrayList<Meals> mMeals;
    private Context mContext;
    private MealSelection mealSelection;

    public MenuRecyclerViewAdapter(Context mContext, ArrayList<Meals> mMeals, MealSelection mealSelection) {
        this.mMeals = mMeals;
        this.mContext = mContext;
        this.mealSelection = mealSelection;

    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View view = (View) LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.menu_recycler_view_item_layout, viewGroup, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.mainText.setText(mMeals.get(position).name);
        holder.description.setText(mMeals.get(position).description);



        String price = "" + String.format("%.2f", mMeals.get(position).price) + " $";
        holder.button_purchase.setText(price);

        holder.button_purchase.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "Position that was clicked: " + position);
                mealSelection.onMealSelected(mMeals.get(position));
            }
        });

    }

    @Override
    public int getItemCount() {
        return mMeals.size();

    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView mainText;
        TextView description;
        Button button_purchase;
        RelativeLayout parentLayout;

        public ViewHolder(View itemView) {
            super(itemView);
            mainText = itemView.findViewById(R.id.itemText);
            description = itemView.findViewById(R.id.itemDescription);
            button_purchase = itemView.findViewById(R.id.button_purchase);
            parentLayout = itemView.findViewById(R.id.parent_layout);
        }
    }

    // Interface that is used from activity who holds an instance of the adapter
    public interface MealSelection {
        void onMealSelected(Meals meal);
    }
}
